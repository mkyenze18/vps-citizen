# This file is licensed under the Affero General Public License version 3 or
# later. See the LICENSE file.

uid=$(shell id -u)
gid=$(shell id -g)
project_directory=$(CURDIR)

# Dev env management
dev-setup:
	poetry install

dev-build:
	docker build docker -f docker/Dockerfile.dev -t ie_ecosystem

dev-run: dev-build
	docker run --name ie_ecosystem --rm -it -v "$(project_directory):/home/user1/user1" -e "UID=$(uid)" -e "GID=$(gid)" -p "5059:8000" ie_ecosystem
