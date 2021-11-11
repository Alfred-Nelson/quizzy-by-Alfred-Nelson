# frozen_string_literal: true

class RemoveQuestionsReferenceInOptions < ActiveRecord::Migration[6.1]
  def change
    remove_reference :options, :questions, index: true, foreign_key: true
  end
end
