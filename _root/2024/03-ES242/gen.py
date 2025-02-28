import datetime

# Starting file number and date
file_num = 14
due_date = datetime.date(2024, 11, 10)

# Iterate to create files Q14.md to Q20.md
for i in range(7):
    file_name = f"Q{file_num}.md"
    file_content = f"""---
dg-publish: true
dg-hide: true
dg-path: 2024-es242/{file_name[:-3]}
---
_Due date: {due_date.strftime("%d %b, %Y")}_

"""
    
    with open(file_name, "w") as file:
        file.write(file_content)
    
    file_num += 1
    due_date += datetime.timedelta(days=2)
