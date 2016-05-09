/* Copyright (c) 2016 Richard Rodger and other contributors, MIT License */
'use strict'

var Assert = require('assert')
var Lab = require('lab')
var Seneca = require('seneca')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it


describe('parambulator', function () {
  it('happy', function (done) {
    Seneca({log: 'silent', legacy: {error_codes: false, validate: true}})
      .use('../parambulator')
      .add({a: 1, b: {required$: true}}, function (msg, done) {
        done(null, {c: 3})
      })
      .act('a:1,b:2', function (err, out) {
        if (err) return done(err)

        Assert.equal(3, out.c)

        this.act('a:1', function (err, out) {
          Assert.equal('act_invalid_msg', err.code)
          done()
        })
      })
  })
})
