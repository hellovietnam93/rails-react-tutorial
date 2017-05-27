class StaticPagesController < ApplicationController
  def show
    if logged_in?
      @posts = Post.newest.includes(:user).map do |post|
        post.as_json include: [:user, :likes,
          comments: {include: [:user, :likes]}]
      end
    end
  end
end
