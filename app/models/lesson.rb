class Lesson < ApplicationRecord
  belongs_to :course
  has_many :videos, dependent: :destroy
end
