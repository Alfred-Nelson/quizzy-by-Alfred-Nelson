# frozen_string_literal: true

class CreateOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.text :value, null: false
      t.boolean :answer, null: false
      t.references :questions, null: false, foreign_key: true

      t.timestamps
    end
  end
end
