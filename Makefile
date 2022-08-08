SHELL=/bin/bash

EMPTY:=
SPACE:=$(EMPTY) $(EMPTY)
COMMA:=$(EMPTY),$(EMPTY)

.PHONY: all deploy rebuild
.ONESHELL:

env_check:
	@if [[ -z "$$CLOUDFLARE_ACCOUNT_ID" ]]; then echo "CLOUDFLARE_ACCOUNT_ID is unset"; exit 1; else echo "CLOUDFLARE_ACCOUNT_ID is set"; fi
	@if [[ -z "$$CLOUDFLARE_API_TOKEN" ]]; then echo "CLOUDFLARE_API_TOKEN is unset"; exit 1; else echo "CLOUDFLARE_API_TOKEN is set"; fi

sym_check: env_check
	@echo "$@: Checking for symlinks for env files";
	@if [[ -z ".env" ]];then \
		echo "ENV File NOT present..."; \
	fi
	@if [[ ! -L "./janus/.dev.vars" ]] || [[ ! -e "./janus/.dev.vars" ]];then \
		echo "Creating symlink for JANUS..."; \
		cd ./janus; \
		ln -nsf ../.env .dev.vars; \
		cd ..; \
	fi
	@if [[ ! -L "./hermes/.dev.vars" ]] || [[ ! -e "./hermes/.dev.vars" ]];then \
		echo "Creating symlink for HERMES..."; \
		cd ./hermes; \
		ln -nsf ../.env .dev.vars; \
		cd ..; \
	fi
