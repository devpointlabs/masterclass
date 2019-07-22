roles = ['teacher', 'student']
categories = ['Ruby', 'Javascript', 'React', 'SQL', 'JQuery', 'React Native']
CourseTitle =['Ruby Fundamentals','Data Structures','Gems/Class/Modules','Git/Github','HTTP Protocols/Flexbox/Devtools','SQL','SQL and Rails','Rails Testing','Javascript-Coding Challenges', 'jQuery','ES6','ReactJS','REact Lifecycle Methods','React Router','React Hooks','React and Rails','React and Rails - CSS','React - Context API','Authentication and React','Producton Deployments','Database Structures','Image Uploades','Advanced SQL','Working with APIs','React and Redux','React Native','Braintree payments with React' ]

5.times do 
  name = Faker::Movies::HarryPotter.character
  nickname = Faker::Games::Pokemon.move
  image = Faker::Avatar.image(name, "200x200", "png", "set3")
  email = Faker::Internet.email
  password = "password"
  u = User.create(name: name, email: email, nickname: nickname, password: password, password_confirmation: password)
  5.times do 
    course = Course.create(
      title: CourseTitle.sample,
      category: categories.sample, 
      overview: Faker::ChuckNorris.fact,
      image: 'https://getuikit.com/v2/docs/images/placeholder_600x400.svg'
      )
    Enrollment.create(
      role: roles.sample,
      course_id: course.id,
      user_id: u.id
    )
      5.times do 
        lesson = Lesson.create(
          name: Faker::Educator.subject,
          description: Faker::Quote.most_interesting_man_in_the_world,
          course_id: course.id
        )
        2.times do
          v = Video.create(
            title: Faker::ProgrammingLanguage.name,
            description: Faker::TvShows::FamilyGuy.quote,
            lesson_id: lesson.id,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
        )
          5.times do 
          c = Comment.create(
            title: Faker::Quote.singular_siegler,
            body: Faker::Quote.famous_last_words,
            user_id: u.id,
            video_id: v.id
          )
            2.times do
            Reply.create(
              body: Faker::Quote.famous_last_words,
              user_id: u.id,
              comment_id: c.id
            )
            end
          end
        end
    end
  end
end

puts "created a bunch of stuff and some comments"