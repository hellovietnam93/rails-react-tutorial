Rails.application.routes.draw do
  root "static_pages#show"

  get "sign_in", to: "sessions#new"
  post "sign_in", to: "sessions#create"
  delete "log_out", to: "sessions#destroy"

  resources :users, except: [:index, :destroy],
    path_names: {new: "sign_up"}
  resources :posts, only: [:create, :update, :destroy] do
    resources :comments, only: [:create, :update, :destroy]
  end
end
