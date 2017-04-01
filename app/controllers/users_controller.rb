class UsersController < ApplicationController
  before_action :find_user, only: :show

  def new
  end

  def create
    user = User.new user_params
    if user.save
      log_in user
      render json: {user: user}
    else
      render json: {errors: user.errors}, status: :unprocessable_entity
    end
  end

  def show
  end

  private
  def user_params
    params.require(:user).permit User::ATTRIBUTE_PARAMS
  end

  def find_user
    @user = User.find_by id: params[:id]
    redirect_to root_path unless @user
  end
end
