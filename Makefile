CURRENT_DIR = $(shell pwd)

.PHONY: build_dockerfile
build_dockerfile:
	docker build -t carta-historia -f Dockerfile .

.PHONY: start
start: build_dockerfile
	docker run -ti --rm --name carta-historia \
		-v $(CURRENT_DIR):/workspace \
		-p 3000:3000 \
		carta-historia \
		start

.PHONY: install_client
install_client: build_dockerfile
	docker run -ti --rm --name carta-historia \
		-v $(CURRENT_DIR):/workspace \
		carta-historia \
		install

.PHONY: build_client
build_client: build_dockerfile
	docker run -ti --rm --name carta-historia \
		-v $(CURRENT_DIR):/workspace \
		--entrypoint yarn \
		carta-historia \
		build
