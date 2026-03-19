terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

# Configure AWS Provider
provider "aws" {
  region = "ap-south-1"
}

# Get default VPC
data "aws_vpc" "default" {
  default = true
}

# Get default subnet
data "aws_subnet" "default" {
  vpc_id            = data.aws_vpc.default.id
  availability_zone = "ap-south-1a" # Change this to your desired availability zone
}

# Create Security group
resource "aws_security_group" "webapp_security_group" {
  name        = "webapp_security_group"
  description = "Security group for webapp"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create EC2 Instance
resource "aws_instance" "webapp" {
  instance_type = "t2.micro"
  ami           = "ami-05d2d839d4f73aafb" # Please check if this AMI is available in ap-south-1
  tags = {
    Name = "webapp"
  }
  vpc_security_group_ids = [aws_security_group.webapp_security_group.id]
  subnet_id              = data.aws_subnet.default.id
  key_name               = "remote_login"
}


