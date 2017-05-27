class LikesController < ApplicationController
  before_action :find_objectable, only: :create
  before_action :find_like, only: :destroy

  def create
    like = current_user.likes.build objectable: @objectable
    if like.save
      render json: {like: like}
    else
      render json: {errors: like.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    if @like.destroy
      render json: {like: @like}
    else
      render json: {errors: @like.errors}, status: :unprocessable_entity
    end
  end

  private
  def like_params
    params.require(:like).permit Like::ATTRIBUTE_PARAMS
  end

  def find_objectable
    @objectable = like_params[:objectable_type].classify.constantize
      .find_by id: like_params[:objectable_id]
    redirect_to root_path unless @objectable
  end

  def find_like
    @like = Like.find_by id: params[:id]
    redirect_to root_path unless @like
  end
end
