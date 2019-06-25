Rails.application.routes.draw do
  namespace :api do
    get 'comments/index'
    get 'comments/show'
    get 'comments/create'
    get 'comments/update'
    get 'comments/destroy'
  end
  namespace :api do
    get 'videos/index'
    get 'videos/show'
    get 'videos/create'
    get 'videos/update'
    get 'videos/destroy'
  end
  namespace :api do
    get 'lessons/index'
    get 'lessons/show'
    get 'lessons/create'
    get 'lessons/update'
    get 'lessons/destroy'
  end
  namespace :api do
    get 'enrollments/index'
    get 'enrollments/show'
    get 'enrollments/create'
    get 'enrollments/update'
    get 'enrollments/destroy'
  end
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do 

    resources :users 

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
