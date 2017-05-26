class Comment < ApplicationRecord
  ATTRIBUTE_PARAMS = [:user_id, :post_id, :content]

  belongs_to :user
  belongs_to :post

  validates :user, presence: true
  validates :post, presence: true
  validates :content, presence: true
end
