class ApplicationController < ActionController::Base
  include SessionHelper

  protect_from_forgery with: :exception
  before_action :set_locale

  private
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def logged_in_user
    unless logged_in?
      redirect_to sign_in_path
    end
  end
end
