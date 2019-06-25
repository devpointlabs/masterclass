Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do 

    resources :users 
    get "my-courses", to: "enrollments#my_courses"

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

end
end
