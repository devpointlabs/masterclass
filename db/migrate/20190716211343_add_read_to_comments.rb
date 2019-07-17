class AddReadToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :read, :boolean, default: false
  end
end
