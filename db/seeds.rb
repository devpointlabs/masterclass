# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
roles = ['teacher', 'student']

5.times do 
  course = Course.create(
    title: Faker::Educator.course_name
    )
    10.times do 
      lesson = Lesson.create(
        name: Faker::Educator.subject,
        description: Faker::Quote.most_interesting_man_in_the_world,
        course_id: course.id
      )
      Video.create(
        title: Faker::Movies::LordOfTheRings.location,
        description: Faker::Quote.yoda,
        lesson_id: lesson.id,
        url: "https://avatars1.githubusercontent.com/u/42650486?s=400&u=d8fabdbbd0a6697e8ab883c0b4d971c87b7ac65c&v=4"
      )
  end
  5.times do 
    name = Faker::Movies::HarryPotter.character
    nickname = Faker::Games::Pokemon.move
    image = Faker::Avatar.image(name, "200x200", "png", "set3")
    email = Faker::Internet.email
    password = "password"
    u = User.create(name: name, email: email, nickname: nickname, password: password, password_confirmation: password)
  5.times do 
    Enrollment.create(
      role: roles.sample,
      course_id: course.id,
      user_id: u.id
    )
  end
end
end

puts "created a bunch of stuff"