class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :title
      t.text :description
      t.string :url
      t.belongs_to :lesson, foreign_key: true

      t.timestamps
    end
  end
end
