# frozen_string_literal: true

module Jekyll
  module PrecisionFilter
    def precision(input, value=0)
      ("%.#{value}f" % input)
    end
  end
end

Liquid::Template.register_filter(Jekyll::PrecisionFilter)
