# frozen_string_literal: true

class AddDefaultConstraintToOptions < ActiveRecord::Migration[6.1]
  def change
    change_column_default :options, :answer, false
  end
end
