roles = ['teacher', 'student']
categories = ['Ruby', 'Javascript', 'React', 'SQL', 'JQuery']

5.times do 
  name = Faker::Movies::HarryPotter.character
  nickname = Faker::Games::Pokemon.move
  image = Faker::Avatar.image(name, "200x200", "png", "set3")
  email = Faker::Internet.email
  password = "password"
  u = User.create(name: name, email: email, nickname: nickname, password: password, password_confirmation: password)
  5.times do 
    course = Course.create(
      title: Faker::Educator.course_name,
      category: categories.sample, 
      overview: Faker::Movies::Hobbit.quote,
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
            title: Faker::Movies::LordOfTheRings.location,
            description: Faker::Quote.yoda,
            lesson_id: lesson.id,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
            # url: videos.sample
        )
          5.times do 
          c = Comment.create(
            title: Faker::Cannabis.health_benefit,
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