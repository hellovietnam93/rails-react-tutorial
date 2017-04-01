class SessionsController < ApplicationController
  before_action :check_login, only: [:new, :create]

  def new
  end

  def create
    user = User.find_by username: session_params[:username]
    if user && user.authenticate(session_params[:password])
      log_in user
      render json: {user: user}
    else
      render json: {errors: t("messages.invalid_login")},
        status: :unprocessable_entity
    end
  end

  private
  def session_params
    params.require(:session).permit :username, :password
  end

  def check_login
    redirect_to root_path if logged_in?
  end
end
