FROM php:8.2-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev zlib1g-dev libxml2-dev libzip-dev zip unzip \
    && docker-php-ext-install pdo_mysql gd zip

# Set Document Root ke folder public Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf

# Aktifkan mod_rewrite Apache (Penting buat Laravel)
RUN a2enmod rewrite

# Copy semua file ke server
COPY . /var/www/html
WORKDIR /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Atur permission
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
