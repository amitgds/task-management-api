# Deploying Node.js Task Management API on AWS EC2 Using Terraform

This guide outlines the step-by-step process for deploying a Node.js-based Task Management API on a single AWS EC2 instance using Terraform. The deployment includes server provisioning, security setup, software installation, and application deployment.

1. Prerequisites

- AWS IAM credentials with admin privileges
- Terraform installed (`terraform -v` to check)
- AWS CLI configured (`aws configure`)
- SSH Key Pair (Ensure you have a public key to use for EC2 access)

2. Infrastructure Overview

- EC2 Instance → Runs Node.js API and stores application files
- IAM Role for EC2 → Grants access to RDS, Secrets Manager, and CloudWatch logs
- Security Groups → Allows required inbound/outbound traffic
- EBS Storage → Stores application files and logs
- RDS Database → Manages database storage
- Secrets Manager → Stores database credentials securely
- Application Load Balancer (ALB) → Handles traffic to EC2



3. Create IAM Role for EC2


resource "aws_iam_role" "ec2_role" {
  name = "EC2InstanceRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "EC2InstanceProfile"
  role = aws_iam_role.ec2_role.name
}



4. Create Security Group for EC2


resource "aws_security_group" "ec2_sg" {
  name = "EC2SecurityGroup"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}



5. Provision EC2 Instance with Terraform


resource "aws_key_pair" "existing_key" {
  key_name   = "my-existing-key"
  public_key = "ssh-rsa ...your-public-key... user@your-machine"
}

resource "aws_instance" "node_server" {
  ami                    = "ami-0c55b159cbfafe1f0"
  instance_type          = "t3.medium"
  key_name               = aws_key_pair.existing_key.key_name
  security_groups        = [aws_security_group.ec2_sg.name]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name
  user_data = file("install.sh")
  tags = { Name = "Node-Task-API" }
}



6. Install & Configure Server Automatically

Create a Bash script (`install.sh`) to install dependencies:


#!/bin/bash

# Update system packages
sudo yum update -y

# Install Node.js & npm
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs git

# Install PM2 for process management
sudo npm install -g pm2

# Clone Task Management API repository
cd /home/ec2-user/
git clone https://github.com/amitgds/task-management.git
cd task-management

# Install dependencies
npm install

# Start the application using PM2
pm run build
pm2 start index.js --name task-api
pm2 startup
pm2 save

# Allow traffic to the application
sudo firewall-cmd --add-port=3000/tcp --permanent
sudo firewall-cmd --reload



7. Deploy Database using RDS


resource "aws_db_instance" "node_db" {
  allocated_storage    = 20
  engine              = "mysql"
  engine_version      = "8.0"
  instance_class      = "db.t3.micro"
  username           = "admin"
  password           = "your-secure-password"
  publicly_accessible = false
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
}



8. Store Database Credentials in AWS Secrets Manager


resource "aws_secretsmanager_secret" "db_secret" {
  name = "node_db_secret"
}

resource "aws_secretsmanager_secret_version" "db_secret_version" {
  secret_id     = aws_secretsmanager_secret.db_secret.id
  secret_string = jsonencode({
    username = "admin"
    password = "your-secure-password"
    host     = aws_db_instance.node_db.endpoint
  })
}



9. Deploy Load Balancer for High Availability


resource "aws_lb" "node_lb" {
  name               = "node-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ec2_sg.id]
  subnets            = ["subnet-xxxxxxxx", "subnet-yyyyyyyy"]
}


10. Apply Terraform Configuration

    Initialize Terraform
      terraform init
    Plan Deployment
      terraform plan
    Apply Deployment
      terraform apply -auto-approve
      
11. Test & Monitor Deployment

 Check Application
- Visit `http://your-ec2-public-ip:3000` to check the Node.js API
- SSH into the server and verify the application is running (`pm2 list`)

 Monitor AWS Logs
- CloudWatch Logs → Monitor EC2 logs
- EC2 Dashboard → Check instance status

This setup ensures that your Node.js Task Management API is securely deployed, monitored, and scalable. 🚀

