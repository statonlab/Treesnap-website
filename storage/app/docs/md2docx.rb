#!/usr/bin/env ruby

Dir.glob('*.md') { |file|
	  system 'pandoc ' + file + ' -o ' + 'word/' + file + '.docx'

}