class User < ApplicationRecord
  ATTRIBUTE_PARAMS = [:username, :password, :password_confirmation]

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  validates :username, presence: true, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true

  has_secure_password

  def current_user? current_user
    self == current_user
  end
end
