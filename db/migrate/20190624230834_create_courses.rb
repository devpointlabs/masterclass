class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.string :category
      t.string :title
      t.text :overview
      t.string :image

      t.timestamps
    end
  end
end
