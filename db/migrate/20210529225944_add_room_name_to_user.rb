class AddRoomNameToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :room_name, :string, null: false
  end
end
