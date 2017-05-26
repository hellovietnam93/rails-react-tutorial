class PostsController < ApplicationController
  before_action :logged_in_user, except: [:show]
  before_action :find_post, only: [:show, :update, :destroy]

  def create
    post = current_user.posts.build post_params
    if post.save
      render json: {post: post.as_json(include: [:user, :comments, :likes])}
    else
      render json: {errors: post.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @post.update_attributes post_params
      render json: {post: @post}
    else
      render json: {errors: @post.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    if @post.destroy
      render json: {post: @post}
    else
      render json: {errors: @post.errors}, status: :unprocessable_entity
    end
  end

  private
  def post_params
    params.require(:post).permit Post::ATTRIBUTE_PARAMS
  end

  def find_post
    @post = Post.find_by id: params[:id]
    redirect_to root_path unless @post
  end
end
