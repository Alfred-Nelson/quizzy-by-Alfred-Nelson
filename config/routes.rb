# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes, except: %i[new edit]
    resources :questions, except: %i[new edit]
    resources :users, only: %i[create]
    resources :attempts, only: %i[update show]
  end

  get "slug/:id", to: "quizzes#get_slug"
  get "slug/quizzes/:slug/questions", to: "quizzes#get_questions_by_slug", param: :slug
  get "slug/quizzes/:slug", to: "quizzes#get_quiz_by_slug", param: :slug
  get "generate_report", to: "quizzes#generate_report"
  get "report_status/:id", to: "quizzes#report_status"
  get "download_report", to: "quizzes#download_report"
  get "standard/quizzes/:id", to: "quizzes#standard_show"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
