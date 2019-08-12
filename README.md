# README
# masterclass


This is an LMS for DevPoint Labs alumni and prospective students to enroll, comment, and view courses from DevPoint Labs content creators. It also contains a teacher suite with a tool box for teachers to manage their courses, lessons, and videos as well as respond to any unread Q&A that are present in their courses. 


- Cloning instructions: 
  - gitclone repo
  - bundle (ensure your ruby version is up to date)
  - rails db:create db:migrate db:seed 
  - run by 'yarn start' in /client and rails s -p 3001 in root 
  - open rails console (rails c)
  - Type User.all 
  - copy and paste one of the user emails with the password: "password" to log in and see the teacher view/ enrolled student view. 


###Screenshots: 
![login page](https://i.ibb.co/b5Zgskn/screencapture-localhost-3000-login-2019-08-11-18-32-30.png)
![home page](https://i.ibb.co/2qxm5PH/screencapture-localhost-3000-2019-08-11-18-31-04.png)
![course page](https://i.ibb.co/fGSkt0R/screencapture-localhost-3000-courses-2-2019-08-11-18-30-27.png)
![video and lesson page](https://i.ibb.co/6nkMPWJ/screencapture-localhost-3000-course-video-view-2-2019-08-11-18-34-15.png)


