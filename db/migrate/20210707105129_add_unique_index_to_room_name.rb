class AddUniqueIndexToRoomName < ActiveRecord::Migration[6.0]
  def change
    add_index :users, :room_name, unique: true
  end
end
