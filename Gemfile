source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'rails', '~> 5.2.3'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'bootsnap', '>= 1.1.0', require: false
gem "devise_token_auth", "~> 1.0.0"
gem 'cloudinary'


group :development, :test do
  gem "pry-rails"
  gem 'dotenv-rails'
  gem "faker", :git => "https://github.com/stympy/faker.git", :branch => "master"
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end


