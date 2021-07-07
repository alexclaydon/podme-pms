class AddOfficeNameToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :office_name, :string
  end
end
