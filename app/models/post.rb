class Post < ApplicationRecord
  ATTRIBUTE_PARAMS = [:user_id, :content]

  belongs_to :user

  has_many :comments, dependent: :destroy

  validates :user, presence: true
  validates :content, presence: true

  scope :newest, ->{order created_at: :desc}
end
