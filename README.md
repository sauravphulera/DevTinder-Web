# Deployment

- Login on aws
- launch EC2 instance
- Create a key value pair
- after downloading .pem file run chmod 400 "devTinder-FE.pem"
- then use ssh command to connect (ssh -i "devTinder-FE.pem" ubuntu@ec2-13-48-133-200.eu-north-1.compute.amazonaws.com)
- install same node version on EC2 machine
- clone your project from github in EC2
- go to project directory

- Frontend
  - run npm i and npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - copy code from /dist to var/www/html/
  - scp -r dist/\* /var/www/html
  - enable port :80 from security / add rule
  - go to public ip of instance on browser
- Backend
  - add public ip of EC2 instance in mongo db network access
  - enable port 3000 in aws security group
  - install pm2 for background process running
  - pm2 start npm -- start in app directory
  - pm2 logs (for logs)
  - pm2 flush npm (to delete all logs)
  - pm2 list (show list of pm2 process), pm2 stop <process name>, pm2 delete <process name>
    -for renaming process => pm2 start npm --name "devTinder-be" -- start
  - configure nginx /etc/nginx/sites-available/default
  - restart nginx after updating config => sudo systemctl restart nginx

Frontend http://13.48.133.200/
Backend http://13.48.133.200:3000/

        server_name 13.48.133.200;
        location /api/ {
                proxy_pass http://localhost:3000/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwar>
        }
