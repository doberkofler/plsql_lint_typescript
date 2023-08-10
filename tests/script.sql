set echo on

create or replace
function multiply(p1 in number, p2 in number) return number
is
begin
	return p1 * p2;
end;
/

declare
	result number;
begin
	result := multiply(3, 5);
end;
/
