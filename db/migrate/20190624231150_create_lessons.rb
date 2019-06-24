class CreateLessons < ActiveRecord::Migration[5.2]
  def change
    create_table :lessons do |t|
      t.string :name
      t.text :description
      t.belongs_to :course, foreign_key: true

      t.timestamps
    end
  end
end
