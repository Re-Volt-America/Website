---
title: Emojis
---

<h2 style="margin-bottom: -0.7rem;"><b>{% t emoji.title %}</b></h2>
<hr class="hr-light-title"/>

{% assign emojis = site.static_files | where: 'emoji', true %}

<div class="container text-center">
    <div class="row">
        {% for emoji in emojis %}
            <div class="col-3">
                <a href="{{ site.baseurl }}{{ emoji.path }}" target="_blank">
                    <img class="emoji-display" src="{{ site.url }}{{ emoji.path }}" alt=""/>
                </a>
            </div>
        {% endfor %}
    </div>
</div>
