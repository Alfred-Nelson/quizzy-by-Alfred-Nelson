# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :task

  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def edit?
    quiz.user_id == user.id
  end

  def create?
    true
  end

  def destroy?
    quiz.user_id == user.id
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(user_id: user.id)
    end
  end
end
