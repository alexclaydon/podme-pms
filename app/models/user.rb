# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable, :rememberable

  has_many :notes, dependent: :delete_all

  before_create :generate_room_name
  before_save :ensure_authentication_token_is_present

  validates :first_name, :last_name, :email, presence: true
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :room_name, uniqueness: { case_sensitive: false }

  def name
    [first_name, last_name].join(" ").strip
  end

  def super_admin?
    role == "super_admin"
  end

  def as_json(options = {})
    new_options = options.merge(only: [:email, :first_name, :last_name, :current_sign_in_at, :room_name, :id, :office_name])

    super new_options
  end

  def full_name
    first_name + " " + last_name
  end

  def generate_room_name
    i = 0
    loop do
      self.room_name = full_name.downcase.gsub(/ /, "-") + get_suffix(i)
      i += 1
      break room_name unless User.where(room_name: self.room_name).exists?
    end
    self.room_name.downcase!
  end

  private

    def send_devise_notification(notification, *args)
      devise_mailer.send(notification, self, *args).deliver_later(queue: "devise_email")
    end

    def ensure_authentication_token_is_present
      if authentication_token.blank?
        self.authentication_token = generate_authentication_token
      end
    end

    def generate_authentication_token
      loop do
        token = Devise.friendly_token
        break token unless User.where(authentication_token: token).first
      end
    end

    def get_suffix(i)
      i > 0 ? "-#{i}" : ""
    end
end
