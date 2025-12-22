# Pitfalls Lab — Engineering Case Studies (Proof of Work)

This repository is a **Pitfalls Lab**: a collection of small, reproducible engineering case studies.
It’s not a “look how smart I am” showcase and not a pile of generic tips — each case is built around
a real failure mode with **minimal reproduction**, a verified **fix**, and the **guardrails** that prevent it from returning.

The goal is to demonstrate an engineering workflow: diagnose symptoms, isolate root cause, validate assumptions,
ship a fix, and encode the learning into tests/lint/monitoring. Some cases are intentionally “common” — not because
they’re impressive, but because they’re **expensive when missed** and worth turning into reliable, repeatable practice.

A practical, reproducible collection of engineering “pitfalls” turned into **case studies**:

**pitfall → symptoms → root cause → minimal repro → fix → prevention (guardrails)**

This repo is designed to be run, tested, and referenced—less “blog”, more “field notes + runnable evidence”.

---

## What you’ll find here

Each technology has a folder (Go, TypeScript, Cloudflare, Postgres, etc.), and each **case** is a small, self-contained unit:

- `README.md` — story + diagnosis + fix + prevention
- `repro/` — minimal example that demonstrates the pitfall
- `fix/` — corrected version + tests
- `notes.md` — trade-offs, variants, references

---

## Repo structure

