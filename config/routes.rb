Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"

  namespace :api do
    resources :users, only: :update
    get "teacher-courses", to: "enrollments#teacher_courses"
    get "my-courses", to: "enrollments#my_courses"
    post "my-courses/:course_id", to: "enrollments#create"
    delete "my-courses/:course_id", to: "enrollments#destroy"
    # post "create-comment", to: "comments#create"

    get "categories", to: "courses#get_categories"
    get "search_courses", to: "courses#search_courses"


    resources :courses do 
      resources :enrollment, only: [:index, :new, :create, :destroy]
    end
    resources :courses do
      resources :lessons
    end
    resources :lessons do
      resources :videos
    end
    resources :videos do
      resources :comments
    end

    resources :comments
    put "toggle-read/:id", to: "comments#toggleread"

    resources :comments do
      resources :replies
    end
  end
  get '*other', to: 'static#index'
end
