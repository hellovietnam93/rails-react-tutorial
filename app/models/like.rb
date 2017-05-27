class Like < ApplicationRecord
  ATTRIBUTE_PARAMS = [:objectable_id, :objectable_type]

  belongs_to :user
  belongs_to :objectable, polymorphic: true

  validates :user, presence: true
  validates :objectable, presence: true
end
