class Video < ApplicationRecord
  belongs_to :lesson
  has_many :comments, dependent: :destroy
end
