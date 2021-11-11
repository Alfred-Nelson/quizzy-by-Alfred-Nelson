# frozen_string_literal: true

class AddQuestionReferenceInOptions < ActiveRecord::Migration[6.1]
  def change
    add_reference :options, :question, index: true, foreign_key: true
  end
end
