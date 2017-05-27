class CommentsController < ApplicationController
  before_action :logged_in_user
  before_action :find_post
  before_action :find_comment, only: [:update, :destroy]

  def create
    comment = @post.comments.build comment_params.merge(user: current_user)
    if comment.save
      render json: {comment: comment.as_json(include: [:user, :likes])}
    else
      render json: {errors: comment.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update_attributes comment_params
      render json: {comment: @comment.as_json(include: :user)}
    else
      render json: {errors: @comment.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    if @comment.destroy
      render json: {comment: @comment.as_json(include: :user)}
    else
      render json: {errors: @comment.errors}, status: :unprocessable_entity
    end
  end

  private
  def comment_params
    params.require(:comment).permit Comment::ATTRIBUTE_PARAMS
  end

  def find_post
    @post = Post.find_by id: params[:post_id]
    redirect_to root_path unless @post
  end

  def find_comment
    @comment = @post.comments.find_by id: params[:id]
    redirect_to root_path unless @comment
  end
end
