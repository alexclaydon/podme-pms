class AddIsSessionLiveToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :is_session_live, :boolean, default: false
  end
end
