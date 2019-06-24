class CreateEnrollments < ActiveRecord::Migration[5.2]
  def change
    create_table :enrollments do |t|
      t.integer :rating
      t.text :review
      t.string :role
      t.belongs_to :user, foreign_key: true
      t.belongs_to :course, foreign_key: true

      t.timestamps
    end
  end
end
