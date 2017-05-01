class UsersController < ApplicationController
  before_action :logged_in_user, only: [:edit, :update]
  before_action :find_user, only: [:show, :edit, :update]
  before_action :correct_user, only: [:edit, :update]

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

  def edit
  end

  def update
    if @user.update_attributes user_params
      render json: {user: @user}
    else
      render json: {errors: @user.errors}, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit User::ATTRIBUTE_PARAMS
  end

  def find_user
    @user = User.find_by id: params[:id]
    redirect_to root_path unless @user
  end

  def correct_user
    redirect_to root_path unless @user.current_user? current_user
  end
end
